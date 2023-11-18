import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const BookService = () => {

    const service = useLoaderData();
    const { title, _id, price ,img} = service;
    const { user } = useContext(AuthContext);

    const handleBookService = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName : name,
            email,
            img,
            date,
            service:title,
            service_id: _id,
            price: price
        }
        console.log(booking);

        fetch('http://localhost:5000/bookings',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(booking)

        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.insertedId){
                alert('Service Recorded')
            }
        })
    }
    return (
        <div>
            <h2 className="text-3xl text-center broder">BOOK YOUR APPOINTMENT: {title}</h2>

            <div>
                <form onSubmit={handleBookService} className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" defaultValue={user?.displayName} name="name" placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name="date" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" defaultValue={user?.email} name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Amount </span>
                            </label>
                            <input type="type" defaultValue={'$ ' + price} placeholder="password" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />

                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookService;