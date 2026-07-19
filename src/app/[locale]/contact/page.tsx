import { createShellPage } from "@/components/layout/create-shell-page";

const shellPage = createShellPage("contact");

export const generateMetadata = shellPage.generateMetadata;

export default shellPage.default;
