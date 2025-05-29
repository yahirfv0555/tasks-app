"use client";

export interface PublicPageProps {
    children: React.ReactNode
}

const PublicPage: React.FC<PublicPageProps> = props => {
    const { children } = props;
    return children
}

export default PublicPage;