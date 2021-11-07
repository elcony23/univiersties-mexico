import DirectoryList from "ui/components/DirectoryList";
import WEB_SERVICES from "./services/WebServices";

const fetchOffersList = async(name="Mexico") => {
    return await WEB_SERVICES.searchByCountry(name)
};


export default function App() {
    return (
        <DirectoryList offerList={fetchOffersList} />
    );
}
