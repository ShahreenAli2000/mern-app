import React, { useState, useEffect } from "react";
import Info from './Info';
import './Info.css';
import { Row, Col } from 'react-bootstrap';
import axios from "axios";
import { URL } from "../uri";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

function Dashboard() {

  const [totalMembers, setTotalMembers] = useState(0);
  let [maleMember, setMaleMember] = useState(0);
  let [femaleMember, setFemaleMember] = useState(0);
  let [totalStaffMembers, setTotalStaffMembers] = useState(0);
  let [maleStaffMember, setMaleStaffMember] = useState(0);
  let [femaleStaffMember, setFemaleStaffMember] = useState(0);

  const getMember = () => {
    axios
      .get(`${URL}/getmembers`)
      .then((res) => {
        setTotalMembers(res.data.data.length);
        res.data.data.forEach(row => {
          if(row.gender === 'Male') {
            maleMember += 1;
          } else if(row.gender === 'Female') {
            femaleMember += 1;
          }
          setMaleMember(maleMember);
          setFemaleMember(femaleMember);
        });
      })
      .catch((err) => console.log(err));
  };

  const getStaff = () => {
    axios
      .get(`${URL}/getstaffs`)
      .then((res) => {
        setTotalStaffMembers(res.data.data.length);
        res.data.data.forEach(row => {
          if(row.gender === 'Male') {
            maleStaffMember += 1;
          } else if(row.gender === 'Female') {
            femaleStaffMember += 1;
          }
          setMaleStaffMember(maleStaffMember);
          setFemaleStaffMember(femaleStaffMember);
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMember();
    getStaff();
  }, []);

  return (
    <div>
      <h3 style={{fontWeight: "bold", marginBottom:"4%"}}>Dashboard</h3>
      <Row>
        <Col style={{borderColor: "#864ad1", padding:"2% 4%"}} className="information">
          <Info text="Members" number={totalMembers} icon={<GroupsIcon sx={{ fontSize: 80, color: "#864ad1" }} />} />
        </Col>
        <Col style={{borderColor: "#ffac30", padding:"2% 4%"}} className="information">
          <Info text="Staff Members" number={totalStaffMembers} icon={<PersonIcon sx={{ fontSize: 80, color: "#ffac30" }} />} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col style={{borderColor: "#51a6f5", padding:"2% 4%"}} className="information">
              <Info text="Male" number={maleMember} icon={<MaleIcon sx={{ fontSize: 40, color: "#51a6f5" }} /> } />
            </Col>
            <Col style={{borderColor: "#ff4961", padding:"2% 4%"}} className="information">
              <Info text="Female" number={femaleMember} icon={<FemaleIcon sx={{ fontSize: 40, color: "#ff4961"}} /> } />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col style={{borderColor: "#51a6f5", padding:"2% 4%"}} className="information">
              <Info text="Male" number={maleStaffMember} icon={<MaleIcon sx={{ fontSize: 40, color: "#51a6f5" }}/> } />
            </Col>
            <Col style={{borderColor: "#ff4961", padding:"2% 4%"}} className="information">
              <Info text="Female" number={femaleStaffMember} icon={<FemaleIcon sx={{ fontSize: 40, color: "#ff4961" }}/> } />
            </Col>
          </Row>
        </Col>
      </Row>
      {/*<div style={{ marginTop: "3%", width: "99%"}}>
        <h5 style={{fontWeight:"bold"}}>Members per month</h5>
      </div>*/}
    </div>
  );
}

export default Dashboard;
