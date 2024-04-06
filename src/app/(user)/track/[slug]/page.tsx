import WaveTrack from '@/components/track/wave.track';
import { useSearchParams } from 'next/navigation'
import Container from '@mui/material/Container';
import { sendRequest } from '@/utils/api';

const DetailTrackPage = async (props: any) => {
    const { params } = props;

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
        method: "GET",
    })

    const comment = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
        url: `http://localhost:8000/api/v1/tracks/comments`,
        method: "POST",
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: params.slug,
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