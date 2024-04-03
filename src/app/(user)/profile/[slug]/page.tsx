import ProfileTracks from "@/components/header/profile.tracks";
import { sendRequest } from "@/utils/api";

const ProfilePage = async ({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop[]>>>({
        url: 'http://localhost:8000/api/v1/tracks/users?current=1&pageSize=10',
        method: 'POST',
        body: { id: params.slug },

    })
    const data = tracks?.data?.result ?? []
    console.log('res:', data)
    // const search = searchParams.get('audio')
    return (
        <div>
            {data?.map((item) => {
                return (
                    <ProfileTracks data={item} />
                )
            })}
        </div>
    );
}

export default ProfilePage
