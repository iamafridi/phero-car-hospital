import { useEffect } from "react";
import { useState } from "react";
import ServicesCard from "./ServicesCard";

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect( ()=>{
        fetch('services.json')
        .then(res =>res.json())
        .then(data => setServices(data))
    },[])

    return (
        <div className="m-10 space-y-5">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-orange-600">Services</h3>
            <h2 className="text-5xl font-bold"> Our Service Area</h2>
            <p className="text-base mt-5 text-[#737373] ">the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
            
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(service => <ServicesCard
                    key={service._id}
                    service={service}
                    ></ServicesCard>)
                }
            </div>
        </div>
    );
};

export default Services;