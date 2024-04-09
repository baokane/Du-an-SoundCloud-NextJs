import { sendRequest } from "@/utils/api"
import Container from "@mui/material/Container"
import next from "next"

const TestA = async () => {
    const res = await sendRequest<any>({
        url: `http://localhost:3000/api/test`,
        method: "GET",
        nextOption: {
            next: { revalidate: 4 }
        }
    })
    return (
        <Container sx={{ mt: 5 }}>
            <div>Test random</div>
            <div>
                {JSON.stringify(res)}
            </div>
        </Container>
    )
}

export default TestA