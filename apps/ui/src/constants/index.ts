export const metaDataLabels = {
  title: 'Carbon Credits Portfolio',
  description:
    'Generates Portfolio with a variety of carbon credits for customers',
};

export const headingLabels = {
  title: 'Purchase',
  subtitle: 'Carbon Credits',
  description:
    'Seemlessly purchase high-quality carbon credits from the CEEZER climate portfolio. The portfolio is curated by corporate sustainability to be in-line with the so-called Oxford principles for net zero aligned offsetting.',
};

export const formLabels = {
  title: 'Generate portfolio',
  description:
    'Enter the target credit volume to automatically generate an optimized portfolio',
  inputs: {
    volume: {
      id: 'volume',
      label: 'Volume',
      placeholder: 'Enter the volume in tons',
      errors: {
        required: 'Volume is required',
        positive: 'Volume must be greater than zero',
        typeError: 'Volume must be a number',
      },
    },
  },
  button: {
    label: 'Generate',
  },
};

export const tableLabels = {
  title: 'Your portfolio',
  noData:
    'Unfortunately, we cannot generate portfolio for your requested volume :(',
};

export const footerLabels = {
  copyright: '© 2024 Ceezer. All rights reserved',
};

export const globalError = {
  error: 'Server error',
  message: 'Something went wrong. Please try again later.',
};
