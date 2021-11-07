
import Table from './Table/Table';

export default function DirectoryList({ offerList, ...props }) {

    const [universities, setUniversities] = useState([])
    const [progressPending,setProgressPending] = useState(false)

    const getUniviersities = async() => {
        try{
            setProgressPending(true)
            let universities = (await offerList()).sort((a, b) => a.name.localeCompare(b.name));
            universities = universities.map((row,idx) => ({...row,isEven: (idx+1) % 2 === 0}))
            setProgressPending(false)
            setUniversities(universities)
        }catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
        getUniviersities()
    }, [])
    return (
        <Table data={universities} progressPending={progressPending}/>
    );
}
