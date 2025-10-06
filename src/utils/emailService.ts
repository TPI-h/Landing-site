import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_qzhlrc6';
const EMAILJS_TEMPLATE_ID = 'template_7doyr7d';
const EMAILJS_PUBLIC_KEY = 'B7N0kS_gZqrtfNaC3';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface BookingFormData {
    name: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    roomType: string;
    specialRequests: string;
}

export const sendBookingEmail = async (formData: BookingFormData): Promise<void> => {
    try {
        console.log('Sending email with data:', formData);

        const templateParams = {
            to_name: 'Hotel Manager',
            to_email: 'thendralparkinn@gmail.com',
            from_name: formData.name,
            from_email: formData.email,
            reply_to: formData.email,
            phone: formData.phone,
            check_in: formData.checkIn,
            check_out: formData.checkOut,
            guests: formData.guests,
            room_type: formData.roomType,
            special_requests: formData.specialRequests || 'None'
        };

        console.log('Template params:', templateParams);

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        console.log('EmailJS response:', response);

        if (response.status !== 200) {
            throw new Error(`EmailJS returned status: ${response.status}`);
        }

        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Detailed email error:', error);

        // More specific error messages
        if (error.text) {
            throw new Error(`EmailJS Error: ${error.text}`);
        } else if (error.status) {
            throw new Error(`EmailJS returned status ${error.status}: ${error.text || 'Unknown error'}`);
        } else {
            throw new Error('Failed to send booking request. Please check your internet connection and try again.');
        }
    }
};