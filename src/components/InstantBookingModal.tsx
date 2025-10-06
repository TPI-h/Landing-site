import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Users, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import SKYHMSBookingService from "@/utils/skyHMSBookingService";

interface InstantBookingModalProps {
    children: React.ReactNode;
    roomType?: string;
}

export const InstantBookingModal = ({ children, roomType }: InstantBookingModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fromdate: '',
        todate: '',
        noofrooms: 1 as number | string
    });

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleBooking = async () => {
        try {
            // Validate inputs
            if (!formData.fromdate || !formData.todate) {
                toast.error('Please select check-in and check-out dates');
                return;
            }

            const roomCount = typeof formData.noofrooms === 'string' ? parseInt(formData.noofrooms) : formData.noofrooms;
            if (!roomCount || roomCount < 1) {
                toast.error('Please select at least 1 room');
                return;
            }

            // Validate dates
            const dateError = SKYHMSBookingService.validateBookingDates(formData.fromdate, formData.todate);
            if (dateError) {
                toast.error(dateError);
                return;
            }

            setIsLoading(true);

            // Calculate nights for display
            const nights = SKYHMSBookingService.calculateNights(formData.fromdate, formData.todate);

            console.log('Booking details:', {
                ...formData,
                nights,
                roomType: roomType || 'Any Room'
            });

            // Send booking request to SKYHMS
            const response = await SKYHMSBookingService.createBooking({
                fromdate: formData.fromdate,
                todate: formData.todate,
                noofrooms: roomCount
            });

            if (response.success) {
                toast.success('Booking request sent successfully!');

                // If there's a booking URL, open it
                if (response.bookingUrl) {
                    console.log('Opening booking URL:', response.bookingUrl);
                    window.open(response.bookingUrl, '_blank');
                    toast.success(`Redirecting to booking confirmation...`);
                } else {
                    // If no URL, show success message with details
                    toast.success(`Booking confirmed for ${nights} night(s), ${roomCount} room(s)`);
                }

                setIsOpen(false);

                // Reset form
                setFormData({
                    fromdate: '',
                    todate: '',
                    noofrooms: 1
                });
            } else {
                console.error('Booking failed:', response.error);
                toast.error(response.error || 'Failed to process booking request');
            }

        } catch (error) {
            console.error('Booking error:', error);
            toast.error('Network error: Unable to connect to booking service. Please try again or contact us directly.');
        } finally {
            setIsLoading(false);
        }
    };

    // Get tomorrow's date as minimum check-in date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    // Get minimum check-out date (day after check-in)
    const minCheckOut = formData.fromdate
        ? new Date(new Date(formData.fromdate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        : minDate;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gold" />
                        Instant Booking
                        {roomType && <span className="text-sm text-muted-foreground">- {roomType}</span>}
                    </DialogTitle>
                    <DialogDescription>
                        Select your check-in and check-out dates, number of rooms, and proceed with instant booking.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Check-in Date */}
                    <div className="space-y-2">
                        <Label htmlFor="checkin">Check-in Date</Label>
                        <Input
                            id="checkin"
                            type="date"
                            min={minDate}
                            value={formData.fromdate}
                            onChange={(e) => handleInputChange('fromdate', e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Check-out Date */}
                    <div className="space-y-2">
                        <Label htmlFor="checkout">Check-out Date</Label>
                        <Input
                            id="checkout"
                            type="date"
                            min={minCheckOut}
                            value={formData.todate}
                            onChange={(e) => handleInputChange('todate', e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Number of Rooms */}
                    <div className="space-y-2">
                        <Label htmlFor="rooms">Number of Rooms</Label>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <Input
                                id="rooms"
                                type="number"
                                min="1"
                                max="10"
                                value={formData.noofrooms}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '') {
                                        handleInputChange('noofrooms', '');
                                    } else {
                                        const numValue = parseInt(value);
                                        if (!isNaN(numValue) && numValue > 0) {
                                            handleInputChange('noofrooms', numValue);
                                        }
                                    }
                                }}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Booking Summary */}
                    {formData.fromdate && formData.todate && (
                        <div className="bg-gray-50 p-3 rounded-lg text-sm">
                            <div className="flex justify-between">
                                <span>Duration:</span>
                                <span>{SKYHMSBookingService.calculateNights(formData.fromdate, formData.todate)} night(s)</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Rooms:</span>
                                <span>{formData.noofrooms || 0} room(s)</span>
                            </div>
                            {roomType && (
                                <div className="flex justify-between">
                                    <span>Room Type:</span>
                                    <span>{roomType}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="flex-1"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleBooking}
                        className="flex-1 bg-gold hover:bg-gold/90"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Book Now
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default InstantBookingModal;