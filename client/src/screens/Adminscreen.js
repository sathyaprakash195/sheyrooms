import React , {useState, useEffect} from "react";
import { Tabs } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import { Tag, Divider } from "antd";



const { TabPane } = Tabs;
const user = JSON.parse(localStorage.getItem("currentUser"));
function Adminscreen() {
  return (
    <div className="ml-3">
        <h2 className="text-center m-2" style={{ fontSize: "35px" }}>Admin Panel</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <div className="row">
            <Bookings/>
          </div>
        </TabPane>
        <TabPane tab="Rooms" key="2">
        
            <div className="row">
               <Rooms/>
            </div>
         
        </TabPane>
        <TabPane tab="Add Room" key="3">
         
            
                 <Addroom/>
        
          
        </TabPane>
        <TabPane tab="Users" key="4">
      
            <Users/>
      
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  useEffect(async () => {
    try {
      setloading(true);
      const data = await (
        await axios.get("/api/bookings/getallbookings")
      ).data;
      setbookings(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  }, []);
    return (
        <div className='col-md-11'>
            <h1>Bookings</h1>
            {loading ? (<Loader/>) : error ? (<Error/>) : (<div>

                   <table className='table table-bordered table-dark'>
                       <thead className='bs'>
                           <tr>
                               <th>Booking Id</th>
                               <th>Userid</th>
                               <th>Room</th>
                               <th>From</th>
                               <th>To</th>
                               <th>Status</th>
                           </tr>
                       </thead>
                       <tbody>
                           {bookings.map(booking=>{
                               return <tr>
                                   <td>{booking._id}</td>
                                   <td>{booking.userid}</td>
                                   <td>{booking.room}</td>
                                   <td>{booking.fromdate}</td>
                                   <td>{booking.todate}</td>
                                   <td>{booking.status}</td>
                               </tr>
                           })}
                       </tbody>
                   </table>

            </div>)}
        </div>
    )
}


export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  useEffect(async () => {
    try {
      setloading(true);
      const data = await (
        await axios.get("/api/rooms/getallrooms")
      ).data;
      setrooms(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  }, []);
    return (
        <div className='col-md-11'>
            <h1>Rooms</h1>
            {loading ? (<Loader/>) : error ? (<Error/>) : (<div>

                   <table className='table table-bordered table-dark'>
                       <thead className='bs'>
                           <tr>
                               <th>Room Id</th>
                               <th>Name</th>
                               <th>Type</th>
                               <th>Rent Per day</th>
                               <th>Max Count</th>
                               <th>Phone Number</th>
                           </tr>
                       </thead>
                       <tbody>
                           {rooms.map(room=>{
                               return <tr>
                                   <td>{room._id}</td>
                                   <td>{room.name}</td>
                                   <td>{room.type}</td>
                                   <td>{room.rentperday}</td>
                                   <td>{room.maxcount}</td>
                                   <td>{room.phonenumber}</td>
                               </tr>
                           })}
                       </tbody>
                   </table>

            </div>)}
        </div>
    )
}



export function Users(){

  const[users , setusers] = useState()
  const[loading , setloading] = useState(true)
  useEffect(async() => {

    try {
      const data = await (await axios.get('/api/users/getallusers')).data
      setusers(data)
      setloading(false)
    } catch (error) {
      console.log(error)
      setloading(false)
    }
    
  }, [])

  return(
    <div className='row'>
          {loading && (<Loader/>)}

       <div className="col-md-10">
       <table className='table table-bordered table-dark'>
           <thead className='bs'>
             <tr>
               <th>Id</th>
               <th>Name</th>
               <th>Email</th>
               <th>isAdmin</th>
             </tr>
           </thead>
         
         <tbody>

        

          {users && (users.map(user=>{
            return <tr>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'YES' : 'NO'}</td>
            </tr>
          }))}
           </tbody>
          </table>
       </div>
    </div>
  )

}


export function Addroom() {
  const [room, setroom] = useState("");
  const [rentperday, setrentperday] = useState();
  const [maxcount, setmaxcount] = useState();
  const [description, setdescription] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [type, settype] = useState("");
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  const [image3, setimage3] = useState("");
  async function addRoom()
  {
      const roomobj = {
          room , 
          rentperday, maxcount ,description ,phonenumber ,type ,image1 ,image2 ,image3
      }
      try {
          const result = await axios.post('/api/rooms/addroom' , roomobj)
      } catch (error) {
          
      }
  }
  return (
    <div className="row">
     
        <div className="col-md-5">
          <input
            type="text"
            className="form-control mt-1"
            placeholder="name"
            value={room}
            onChange={(e) => {
              setroom(e.target.value);
            }}
          />

          <input
            type="text"
            className="form-control mt-1"
            placeholder="rentperday"
            value={rentperday}
            onChange={(e) => {
              setrentperday(e.target.value);
            }}
          />

          <input
            type="text"
            className="form-control mt-1"
            placeholder="maxcount"
            value={maxcount}
            onChange={(e) => {
              setmaxcount(e.target.value);
            }}
          />

          <input
            type="text"
            className="form-control mt-1"
            placeholder="description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />

          <input
            type="text"
            className="form-control mt-1"
            placeholder="phonenumber"
            value={phonenumber}
            onChange={(e) => {
              setphonenumber(e.target.value);
            }}
          />
          
        </div>

        <div className="col-md-6">
        <input
            type="text"
            className="form-control mt-1"
            placeholder="type"
            value={type}
            onChange={(e) => {
              settype(e.target.value);
            }}
          />
        <input
            type="text"
            className="form-control mt-1"
            placeholder="Image url 1"
            value={image1}
            onChange={(e) => {
              setimage1(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Image url 2"
            value={image2}
            onChange={(e) => {
              setimage2(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Image url 3"
            value={image3}
            onChange={(e) => {
              setimage3(e.target.value);
            }}
          />
          <div className='mt-1 text-right'>
          <button className="btn btn-primary" onClick={addRoom}>ADD ROOM</button>
          </div>
        </div>
     
    </div>
  );
}

