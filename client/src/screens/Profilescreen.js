import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import { Tag, Divider } from 'antd';
const { TabPane } = Tabs;

const user = JSON.parse(localStorage.getItem('currentUser'))
function Profilescreen() {
  return (
    <div className="mt-5 ml-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="My Profile" key="1">
         <div className="row">
           <div className="col-md-6 bs m-2 p-3">
           <h1>Name : {user.name}</h1>
          <h1>Email : {user.email}</h1>
          <h1>Admin Access : {user.isAdmin ? "Yes" : "No"}</h1>
          <div className='text-right'>
              <button className='btn btn-primary'>Get Admin Access</button>
              </div>
           </div>
         </div>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <h1>
            <MyOrders />
          </h1>
        </TabPane>
      </Tabs>
  
    </div>
  );
}

export default Profilescreen;

export const MyOrders = () => {
  const [mybookings, setmybookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  useEffect(async () => {
    try {
      setloading(true);
      const data = await (
        await axios.post("/api/bookings/getuserbookings", {
          userid: JSON.parse(localStorage.getItem("currentUser"))._id,
        })
      ).data;
      setmybookings(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  }, []);

  async function cancelBooking(bookingid , roomid){

    
    try {
      setloading(true);
      const result = await axios.post('/api/bookings/cancelbooking' , {bookingid:bookingid , userid:user._id , roomid:roomid});
      setloading(false);
      Swal.fire('Congrats' , 'Your Room has cancelled succeessfully' , 'success').then(result=>{
        window.location.href='/profile'
    })
    } catch (error) {
      Swal.fire('Oops' , 'Something went wrong' , 'error').then(result=>{
        window.location.href='/profile'
    })
      setloading(false)
    }

  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        mybookings.map(booking=>{
          return <div className="row">
          <div className="col-md-6 my-auto">
            <div className='bs m-1 p-2'>
              <h1>{booking.room}</h1>
              <p>BookingId : {booking._id}</p>
              <p>TransactionId : {booking.transactionId}</p>
              <p><b>Check In : </b>{booking.fromdate}</p>
              <p><b>Check Out : </b>{booking.todate}</p>
              <p><b>Amount : </b> {booking.totalAmount}</p>
              <p><b>Status</b> : {booking.status =='booked' ? (<Tag color="green">Confirmed</Tag>) : (<Tag color="red">Cancelled</Tag>)}</p>
              <div className='text-right'>
              {booking.status=='booked' && (<button className='btn btn-primary' onClick={()=>cancelBooking(booking._id , booking.roomid)}>Cancel Booking</button>)}
              </div>
            </div>
          </div>
        </div>
        })
      )}
    </div>
  );
};
