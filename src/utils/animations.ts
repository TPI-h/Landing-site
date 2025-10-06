import { Variants } from "framer-motion";

// Fade in animations
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 60
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const fadeInDown: Variants = {
    hidden: {
        opacity: 0,
        y: -60
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const fadeInLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -60
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const fadeInRight: Variants = {
    hidden: {
        opacity: 0,
        x: 60
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

// Scale animations
export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

// Staggered animations for containers
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

export const staggerItem: Variants = {
    hidden: {
        opacity: 0,
        y: 40
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

// Card stacking animation
export const cardStack: Variants = {
    hidden: {
        opacity: 0,
        y: 100,
        rotateX: -15
    },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: index * 0.2
        }
    })
};

// Floating animation
export const floatingCard: Variants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
    hover: {
        y: -10,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    }
};

// Wave effect
export const waveContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const waveItem: Variants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 2
        }
    }
};

// Viewport options for scroll animations
export const viewportOptions = {
    once: true,
    amount: 0.3
};

export const viewportOptionsRepeated = {
    once: false,
    amount: 0.2
};