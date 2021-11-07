import DataTable from 'react-data-table-component';
import Loader from "react-loader-spinner";
const columns = [
    {
        name: 'Nombre de universidad',
        selector: row => row.name,
        sortable: true
    },
    {
        name: 'Página web',
        cell: row => <CustomLink {...row} />,
    },
];
const linkStyle = {
    cursor: 'pointer',
    textDecoration: 'underline',
    color:'#0000E9'
}
const CustomLink = row => row.web_pages.length > 0 ? <a style={linkStyle} href={row.web_pages[0]} target="_blank" rel="noreferrer">{row.web_pages[0]}</a> : undefined;
const customStyles = {
    headCells: {
        style: {
            backgroundColor:'#6c7ae0',
            color:'white',
            lineHeight:1.4,
            fontSize:18
        }
    },
    rows: {
        style:{
            backgroundColor:'#FAFAFA',
            borderBottomWidth:'0 !important',
            color:'gray',
            lineHeight:1.4,
            fontSize:14
        },
    },
};
const conditionalRowStyles = [
    {
        when: row => row.isEven,
        style: {
            backgroundColor: '#F3EFFB'
        }
    }
]
const CustomLoader  = (visible) => <Loader type="TailSpin" color="#00BFFF" height={80} width={80}/>
const customSort = (rows, selector, direction) => {
    return rows.sort((rowA, rowB) => {
        const aField = selector(rowA)
        const bField = selector(rowB)
        let comparison = 0;
        if (aField > bField) {
            comparison = 1;
        } else if (aField < bField) {
            comparison = -1;
        }
        return direction === 'desc' ? comparison * -1 : comparison;
    }).map((row,idx) => ({...row,isEven: (idx+1) % 2 === 0}));
}
export default function Table({data,progressPending,...props}){
    const [ text , setText ] = useState([])
    const [ universities, setUniversities] = useState([])
    useEffect(() => {
        setUniversities(data)
    }, [data])
    const onSearchText = text => {
        if(text.length == "")
            setUniversities(data)
        setText(text)
    }
    const onKeyPress = event => {
        if(event.key === 'Enter' || event.keyCode === 13){
            const dataFiltered = data.filter(({name}) => name.toLowerCase().includes(text.toLowerCase())).map((row,idx) => ({...row,isEven: (idx+1) % 2 === 0}));
            setUniversities(dataFiltered)
        }
    }
    return (
        <div className="container-table">
        <div style={{display:'flex',justifyContent:'flex-end',margin:'20px 20px 20px 0px'}}>
            <div style={{display:'flex',flexDirection:'column'}}>
                <label htmlFor="temp-id">Buscar</label>
                <input placeholder="Ingrese nombre de universidad"  style={{padding: 10,border: '1px solid #6c7ae0',borderRadius: 10,width: 250}} onKeyPress={(event) =>onKeyPress(event)} type="text" id="temp-id" value={text} className="input-search" onChange={e => onSearchText(e.target.value)}/>
            </div>
        </div>
        <DataTable
            pagination
            columns={columns}
            data={universities}
            paginationComponentOptions={{rangeSeparatorText:'de',rowsPerPageText:'Filas por página'}}
            customStyles={customStyles}
            conditionalRowStyles={conditionalRowStyles}
            progressComponent={<CustomLoader/>}
            progressPending={progressPending}
            sortFunction={customSort}
            noDataComponent="No hay información para mostrar"
        />
        </div>
    )
}