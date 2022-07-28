import React from 'react';
import { getQuiry } from '../../api/AdminApis/AdminQuiry';
import DashboardLoader from '../../components/DashboardContent/DashboardLoader';

const Quirys = () => {
    const [loader, setLoader] = React.useState(false);
    const [query, setQuery] = React.useState([]);

    React.useEffect(() => {
        setLoader(true)
        getQuiry()
            .then(res => {
                setQuery(res?.querys);
                setLoader(false)
            })
    }, [])


    return loader ? (
        <DashboardLoader />
    ) : (

        <div className="container">
            <div className="d-flex justify-content-between">
                <h3>Orders</h3>
            </div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Query</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            query?.length > 0 && query?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.query}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Quirys;