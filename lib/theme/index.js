import config from './config';

const scaled = scale => value => `${scale[value]}${config.unit}`;

export const spacing = scaled(config.scale);
export const type = scaled(config.typeScale);
export const breakpoint = value => config.breakpoints[value - 1];

