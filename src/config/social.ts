export type SocialLink = {
  key: "linkedin" | "github";
  label: string;
  href: string;
};

export const socialLinks = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/enes-yilmaz-026249286",
  },
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/enesy1845",
  },
] as const satisfies readonly SocialLink[];
