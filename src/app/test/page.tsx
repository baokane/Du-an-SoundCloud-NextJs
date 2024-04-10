import { sendRequest } from "@/utils/api"
import Container from "@mui/material/Container"
import { revalidateTag } from 'next/cache'

const TestA = async () => {
    const res = await sendRequest<any>({
        url: `http://localhost:3000/api/test`,
        method: "GET",
        nextOption: {
            // next: { revalidate: 4 }
            next: { tags: ['hoi-dan-it'] }

        }
    })
    revalidateTag('hoi-dan-it')
    return (
        <Container sx={{ mt: 5 }}>
            <div>Test random</div>
            <div>
                {res}
                {/* {JSON.stringify(res)} */}
            </div>
        </Container>
    )
}

export default TestA