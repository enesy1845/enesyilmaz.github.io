import { createShellPage } from "@/components/layout/create-shell-page";

const shellPage = createShellPage("notes");

export const generateMetadata = shellPage.generateMetadata;

export default shellPage.default;
