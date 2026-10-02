/** Meta information */
export type Meta = {
  /** Version */
  version: string;
  /** Build Date */
  date: string;
};

/** Meta information, injected at build time */
export const Meta: Meta = {
  version: import.meta.env.APP_VERSION,
  date: import.meta.env.BUILD_DATE
};
