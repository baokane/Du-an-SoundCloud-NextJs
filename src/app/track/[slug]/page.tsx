import WaveTrack from '@/components/track/wave.track';
import { useSearchParams } from 'next/navigation'
import Container from '@mui/material/Container';
import { sendRequest } from '@/utils/api';
import slugify from 'slugify';
import { revalidateTag } from 'next/cache'

import type { Metadata, ResolvingMetadata } from 'next'
import next from 'next';

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    // const slug = params.slug

    const temp = params?.slug?.split('html') ?? []
    const temp1 = (temp[0]?.split('-') ?? []) as string[]
    const id = temp1[temp1.length - 1]
    // fetch data
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
        method: "GET",
    })

    // optionally access and extend (rather than replace) parent metadata
    //   const previousImages = (await parent).openGraph?.images || []

    return {
        title: res.data?.title,
        description: res.data?.description,
        openGraph: {
            title: 'Hỏi Dân IT update',
            description: 'Beyond Your Coding Skills',
            type: 'website',
            images: [`https://github.com/baokane/Hosting-Images/blob/master/images/bg2.jpg?raw=true`],
        },

    }
}

export function generateStaticParams() {
    return [
        { slug: 'Nu-Hon-Bisou-65f9170fc93bbfbbc8d9ec2a.html' },
        { slug: 'Rolling-Down-65f9170fc93bbfbbc8d9ec2b.html' },
        { slug: 'Khi-Con-Mo-Dan-Phai-65f9170fc93bbfbbc8d9ec2c.html' }
    ]
}

const DetailTrackPage = async (props: any) => {
    const { params } = props;

    const temp = params?.slug?.split('.html') ?? []
    const temp1 = (temp[0]?.split('-') ?? []) as string[]
    const id = temp1[temp1.length - 1]

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
        method: "GET",
        nextOption: {
            // cache: "no-store",
            next: { tags: ['track-by-id'] }
        }
    })
    revalidateTag('track-by-id')
    const comment = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
        method: "POST",
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: id,
            sort: '-createdAt'
        }
    })

    return (
        <Container>
            <div>
                <WaveTrack track={res?.data ?? null} comment={comment.data?.result ?? []} />
            </div>
        </Container>
    )
}

export default DetailTrackPage;