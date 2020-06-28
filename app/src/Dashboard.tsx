import React, { useEffect, useState } from 'react';
import { Card, CardBody, Spinner } from 'reactstrap';
import axios from 'axios';

function Dashboard (props: { token?: String }) {
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    axios({
      method: "get",
      url: "https://api.intelliscan.io/user/domains/",
      headers: {
        token: props.token
      }
    })
    .then((resp) => {
      setDomains(resp.data.domains);
      setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false);
    })
  }, [props.token]);

  if(isLoading)
    return <Spinner type="grow" color="primary" />

  return (
    <div>
        {
          domains.map(d =>
          <Card>
            <CardBody>
              {
                d
              }
            </CardBody>
          </Card>
        )
      }
    </div>
  )
}

export default Dashboard;
  
