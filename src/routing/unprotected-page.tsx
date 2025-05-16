"use client";

export interface UnprotectedPageProps {
    children: React.ReactNode
}

const UnprotectedPage: React.FC<UnprotectedPageProps> = props => {
    const { children } = props;
    return children
}

export default UnprotectedPage;