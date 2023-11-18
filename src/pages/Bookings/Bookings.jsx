import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingsRow from "./BookingsRow";

const Bookings = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([])

    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [])
    const handleDelete = id => {
        const proceed = confirm('Are You Sure??')
        if (proceed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('DELETED ')
                        const reamining = bookings.filter(booking => booking._id!== id)
                        setBookings(reamining);
                    }
                })
        }
    }

    return (
        <div>
            <h2 className="text-5xl">Your Booking : {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        bookings.map(booking=><BookingsRow 
                        key={booking._id}
                        booking={booking}
                        handleDelete={handleDelete}
                        ></BookingsRow>)
                       }
                      
                    </tbody>
                 

                </table>
            </div>
        </div>
    );
};

export default Bookings;