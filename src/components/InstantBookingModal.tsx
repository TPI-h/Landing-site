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

// Helper function to format dates as YYYY-MM-DD
const getFormattedDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const InstantBookingModal = ({ children, roomType }: InstantBookingModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // --- CHANGED: Initialize state with today's and tomorrow's dates ---
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [formData, setFormData] = useState({
        fromdate: getFormattedDate(today),
        todate: getFormattedDate(tomorrow),
        noofrooms: 1 as number | string
    });

    const handleInputChange = (field: 'fromdate' | 'todate' | 'noofrooms', value: string | number) => {
        setFormData(prev => {
            const newFormData = { ...prev, [field]: value };

            // --- ADDED: Auto-update checkout date if check-in date changes ---
            // This ensures the checkout date is always after the check-in date.
            if (field === 'fromdate') {
                const checkInDate = new Date(value as string);
                const checkOutDate = new Date(newFormData.todate);

                if (checkInDate >= checkOutDate) {
                    const newCheckOutDate = new Date(checkInDate);
                    newCheckOutDate.setDate(checkInDate.getDate() + 1);
                    newFormData.todate = getFormattedDate(newCheckOutDate);
                }
            }
            return newFormData;
        });
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
                // Close modal and show success message
                setIsOpen(false);

                // Show success message since form submission opens in new tab
                toast.success('Booking form submitted! The booking page is opening in a new tab.', {
                    duration: 4000
                });

                // Reset form to default (today and tomorrow)
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                setFormData({
                    fromdate: getFormattedDate(today),
                    todate: getFormattedDate(tomorrow),
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

    // --- CHANGED: Minimum date logic ---
    // Minimum check-in date is today
    const minCheckInDate = getFormattedDate(new Date());

    // Minimum check-out date is the day after the selected check-in date
    const fromDateObj = new Date(formData.fromdate);
    const nextDayFromCheckIn = new Date(fromDateObj);
    nextDayFromCheckIn.setDate(fromDateObj.getDate() + 1);
    const minCheckOutDate = getFormattedDate(nextDayFromCheckIn);


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
                            min={minCheckInDate} // Use new variable
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
                            min={minCheckOutDate} // Use new variable
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