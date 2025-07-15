import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Dashboard = () => {
    // const { role } = useParams();
    const authState = useSelector((state) => state.auth);
    console.log("authState inside dashboard is", authState)
    return (
        <div className="dashboard">
        <h1 className="dashboard-title">
            {`Welcome ${role}`}
        </h1>
        <div className="dashboard-cards">
            <div className="dashboard-card">
            <h3>Profile</h3>
            <p>Manage your personal info</p>
            </div>
            <div className="dashboard-card">
            <h3>Analytics</h3>
            <p>Track your activity</p>
            </div>
            <div className="dashboard-card">
            <h3>Settings</h3>
            <p>Configure your preferences</p>
            </div>
        </div>
        </div>
    )
}


