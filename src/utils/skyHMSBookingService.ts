// SKYHMS Booking Engine Integration Service

export interface BookingRequest {
    propid: string;
    fromdate: string; // Format: YYYY-MM-DD
    todate: string;   // Format: YYYY-MM-DD
    noofrooms: number;
    apikey: string;
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
    propid: import.meta.env.VITE_SKYHMS_PROP_ID || '111',
    apikey: import.meta.env.VITE_SKYHMS_API_KEY || '1111111'
};

export class SKYHMSBookingService {

    /**
     * Send booking request to SKYHMS API
     */
    static async createBooking(bookingData: {
        fromdate: string;
        todate: string;
        noofrooms: number;
    }): Promise<BookingResponse> {
        try {
            console.log('Sending booking request to SKYHMS:', bookingData);

            const payload: BookingRequest = {
                propid: SKYHMS_CONFIG.propid,
                fromdate: bookingData.fromdate,
                todate: bookingData.todate,
                noofrooms: bookingData.noofrooms,
                apikey: SKYHMS_CONFIG.apikey
            };

            console.log('SKYHMS API payload:', payload);

            // Try using URLSearchParams to avoid CORS issues with JSON
            const formData = new URLSearchParams();
            formData.append('propid', payload.propid);
            formData.append('fromdate', payload.fromdate);
            formData.append('todate', payload.todate);
            formData.append('noofrooms', payload.noofrooms.toString());
            formData.append('apikey', payload.apikey);

            const response = await fetch(SKYHMS_CONFIG.baseUrl, {
                method: 'POST',
                body: formData
            });

            console.log('SKYHMS API response status:', response.status);

            if (!response.ok) {
                throw new Error(`SKYHMS API error: ${response.status} ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log('SKYHMS API response data:', responseData);

            return {
                success: true,
                data: responseData,
                bookingUrl: responseData.bookingUrl || responseData.url || null
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