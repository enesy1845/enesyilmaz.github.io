export type SocialLink = {
  key: "email" | "linkedin" | "github" | "medium" | "youtube";
  label: string;
  href: string;
  description: string;
};

export const socialLinks = [
  {
    key: "email",
    label: "Email",
    href: "mailto:enes.yilmaz1845@gmail.com",
    description: "enes.yilmaz1845@gmail.com",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/enes-yilmaz-026249286",
    description: "linkedin.com/in/enes-yilmaz-026249286",
  },
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/enesy1845",
    description: "github.com/enesy1845",
  },
  {
    key: "medium",
    label: "Medium",
    href: "https://medium.com/@yilmazenes0604",
    description: "medium.com/@yilmazenes0604",
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCwnYJAJrL6B48D73zvcWdeA",
    description: "Teaching and programming videos",
  },
] as const satisfies readonly SocialLink[];
