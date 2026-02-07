import { BlockPreviewClient } from './block-preview-client'

export function generateStaticParams() {
    return [
        { slug: 'header' },
        { slug: 'footer' },
    ]
}

export default async function BlockPreviewPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    return <BlockPreviewClient slug={slug} />
}
