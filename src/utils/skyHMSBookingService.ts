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
     * Create booking by submitting form directly (no CORS issues)
     * This mimics the working example's approach exactly
     */
    static submitBookingForm(bookingData: {
        fromdate: string;
        todate: string;
        noofrooms: number;
    }): void {
        console.log('Submitting booking form to SKYHMS:', bookingData);

        // Create payload in the exact order specified by SKYHMS API documentation
        const payload: BookingRequest = {
            propid: SKYHMS_CONFIG.propid,
            fromdate: bookingData.fromdate,
            todate: bookingData.todate,
            noofrooms: bookingData.noofrooms,
            apikey: SKYHMS_CONFIG.apikey
        };

        console.log('SKYHMS API payload:', payload);

        // Create a hidden form dynamically and submit it
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = SKYHMS_CONFIG.baseUrl;
        form.target = '_blank'; // Open in new tab
        form.style.display = 'none';

        // Add the apikey field with JSON payload
        const apikeyField = document.createElement('input');
        apikeyField.type = 'hidden';
        apikeyField.name = 'apikey';
        apikeyField.value = JSON.stringify(payload);

        form.appendChild(apikeyField);
        document.body.appendChild(form);

        console.log('Submitting form with payload:', JSON.stringify(payload));

        // Submit the form
        form.submit();

        // Clean up - remove form after submission
        setTimeout(() => {
            document.body.removeChild(form);
        }, 1000);
    }

    /**
     * Main booking method - uses form submission to avoid CORS issues
     */
    static async createBooking(bookingData: {
        fromdate: string;
        todate: string;
        noofrooms: number;
    }): Promise<BookingResponse> {
        try {
            // Use form submission instead of fetch to avoid CORS issues
            this.submitBookingForm(bookingData);

            return {
                success: true,
                data: 'Booking form submitted successfully. Opening SKYHMS booking page in new tab.',
                bookingUrl: 'Opening in new tab...'
            };

        } catch (error) {
            console.error('SKYHMS booking error:', error);

            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to process booking request'
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