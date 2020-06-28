import React, {useState} from 'react';
import { Alert, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import axios from 'axios';


function Login (props: { setToken: Function }) {
  const [payload, setPayload] = useState({username: "initiate", password: "illuminated"});

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError]   = useState(undefined);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError(undefined);
    setIsLoading(true);
    axios({
      method: "post",
      url: "https://api.intelliscan.io/user/sign-in/",
      data: payload
    })
      .then((resp) => {
        props.setToken(resp.data.token)
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      })
  }

  const handleChange = (e: any) => {
    setPayload(Object.assign({}, payload, { [e.target.name] : e.target.value}))
  }

  if(isLoading)
    return <Spinner type="grow" color="primary" />


  return (

    <Form onSubmit={handleSubmit}>
      {
        error &&
          <FormGroup>
            <Alert color="danger">
              {error}
            </Alert>
          </FormGroup>
      }
      <FormGroup >
        <Label for="username">Username</Label>
        <Input
          onChange={handleChange}
          name="username"
          id="username"
          placeholder="Username"
          value={payload.username}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={payload.password}
        />
      </FormGroup>
      <Button>
        Submit
      </Button>
    </Form>
  );
}

export default Login;
