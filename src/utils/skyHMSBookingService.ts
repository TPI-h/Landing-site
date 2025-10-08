// SKYHMS Booking Engine Integration Service

export interface BookingRequest {
    propid: number;     // Property ID provided by SKYHMS (Integer)
    fromdate: string;   // Format: YYYY-MM-DD (check-in date)
    todate: string;     // Format: YYYY-MM-DD (check-out date)  
    noofrooms: number;  // Number of rooms to book
    apikey: string;     // API key provided by SKYHMS
}

export interface BookingResponse {
    success: boolean;
    data?: any;
    error?: string;
    bookingUrl?: string;
}

// Configuration - Gets credentials from environment variables
const SKYHMS_CONFIG = {
    baseUrl: 'https://bookings.skyrooms.in/bookapi',
    propid: parseInt(import.meta.env.VITE_SKYHMS_PROP_ID || '111'),
    apikey: import.meta.env.VITE_SKYHMS_API_KEY || '1111111'
};

export class SKYHMSBookingService {

    /**
     * Send booking request to SKYHMS API
     * 
     * The API should return a booking URL for redirect to complete the booking process.
     * Domain thendralparkinn.com is whitelisted with SKYHMS.
     */
    static async createBooking(bookingData: {
        fromdate: string;
        todate: string;
        noofrooms: number;
    }): Promise<BookingResponse> {
        try {
            console.log('Sending booking request to SKYHMS:', bookingData);

            // Create payload in the exact order specified by SKYHMS API documentation
            const payload: BookingRequest = {
                propid: SKYHMS_CONFIG.propid,
                fromdate: bookingData.fromdate,
                todate: bookingData.todate,
                noofrooms: bookingData.noofrooms,
                apikey: SKYHMS_CONFIG.apikey
            };

            console.log('SKYHMS API payload:', payload);

            const formData = new URLSearchParams();
            formData.append('apikey', JSON.stringify(payload));

            console.log('Form data being sent:', formData.toString());

            const response = await fetch(SKYHMS_CONFIG.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            });

            console.log('SKYHMS API response status:', response.status);

            if (!response.ok) {
                throw new Error(`SKYHMS API error: ${response.status} ${response.statusText}`);
            }

            // Handle both JSON and text responses
            let responseData;
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }

            console.log('SKYHMS API response data:', responseData);

            // If response is HTML or contains redirect URL, extract it
            if (typeof responseData === 'string') {
                // Check if it's an HTML response with a redirect
                if (responseData.includes('<script>') && responseData.includes('window.location')) {
                    const urlMatch = responseData.match(/window\.location\s*=\s*["']([^"']+)["']/);
                    if (urlMatch) {
                        return {
                            success: true,
                            data: responseData,
                            bookingUrl: urlMatch[1]
                        };
                    }
                }

                // Check for direct URL in response
                const urlMatch = responseData.match(/https?:\/\/[^\s<>"]+/);
                if (urlMatch) {
                    return {
                        success: true,
                        data: responseData,
                        bookingUrl: urlMatch[0]
                    };
                }

                // If response contains "Incorrect Domain", it means domain issue
                if (responseData.includes('Incorrect Domain')) {
                    return {
                        success: false,
                        error: 'Domain not whitelisted with SKYHMS. Please contact support.',
                        data: responseData
                    };
                }
            }

            // Handle JSON response
            if (responseData && typeof responseData === 'object') {
                const bookingUrl = responseData.bookingUrl || responseData.url || responseData.redirectUrl || responseData.redirect_url;
                if (bookingUrl) {
                    return {
                        success: true,
                        data: responseData,
                        bookingUrl: bookingUrl
                    };
                }
            }

            // If we reach here, return success but no URL found
            return {
                success: true,
                data: responseData,
                bookingUrl: null
            };

        } catch (error) {
            console.error('SKYHMS booking error:', error);

            // More detailed error handling
            let errorMessage = 'Failed to process booking request';

            if (error instanceof TypeError && error.message.includes('fetch')) {
                errorMessage = 'Network error: Unable to connect to booking service. Please check your internet connection.';
            } else if (error instanceof Error) {
                if (error.message.includes('CORS')) {
                    errorMessage = 'CORS error: Unable to access booking service from this domain.';
                } else if (error.message.includes('Failed to fetch')) {
                    errorMessage = 'Network error: Unable to reach booking service. This might be due to CORS policy or network issues.';
                } else {
                    errorMessage = error.message;
                }
            }

            return {
                success: false,
                error: errorMessage
            };
        }
    }

    /**
     * Validate booking dates
     */
    static validateBookingDates(fromdate: string, todate: string): string | null {
        const checkIn = new Date(fromdate);
        const checkOut = new Date(todate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (checkIn < today) {
            return 'Check-in date cannot be in the past';
        }

        if (checkOut <= checkIn) {
            return 'Check-out date must be after check-in date';
        }

        return null; // Valid
    }

    /**
     * Format date for API (YYYY-MM-DD)
     */
    static formatDateForAPI(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    /**
     * Calculate number of nights
     */
    static calculateNights(fromdate: string, todate: string): number {
        const checkIn = new Date(fromdate);
        const checkOut = new Date(todate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
}

export default SKYHMSBookingService;