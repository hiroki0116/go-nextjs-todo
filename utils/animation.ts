export const easing = [0.6, -0.05, 0.01, 0.99];

export const fadeInDown = {
  initial: {
    y: -60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const fadeInLeft = {
  initial: {
    x: -60,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easing,
    },
  },
};

export const fadeInRight = {
  initial: {
    x: 60,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const showFromTop = {
  open: {
    opacity: 1,
    y: "90%",
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const showFromLeftMobile = {
  open: {
    opacity: 1,
    x: "-10%",
    y: 0,
    transition: {
      duration: 0.3,
      ease: easing,
    },
  },
  closed: {
    opacity: 0,
    x: "100%",
    y: 0,
    transition: {
      duration: 0.3,
      ease: easing,
    },
  },
};
