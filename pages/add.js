import Link from "next/link";
import Layout from "../components/layout";
import {
  Flex,
  Container,
  Box,
  Button,
  Input,
  Stack,
  Select,
  Divider,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AlertMessageSuccess from "../components/AlertMessage";
import AlertMessageFail from "../components/AlertMessageFail";

export default function add() {
  const { register, handleSubmit, errors } = useForm();

  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

  const onSubmit = (data) => {
    fetch("http://localhost:3000/api/addToExpenses", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((result) => {
      const newResult = result.ok ? (
        <AlertMessageSuccess
          setResultOfPost={setResultOfPost}
        ></AlertMessageSuccess>
      ) : (
        <AlertMessageFail setResultOfPost={setResultOfPost}></AlertMessageFail>
      );
      setResultOfPost(newResult);
    });
  };

  const [resultOfPost, setResultOfPost] = useState("");

  return (
    <Layout>
      <Flex
        flexDirection="column"
        alignItems="stretch"
        alignContent="space-evenly"
        justifyContent="center"
        p="30px"
        m="30px"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            placeholder="Select payer"
            type="text"
            name="user"
            m="10px"
            ref={register({ required: true })}
            height="50px"
          >
            <option value="Calle">Calle</option>
            <option value="Linus">Linus</option>
          </Select>
          <Input
            height="50px"
            type="text"
            placeholder="Description"
            name="what"
            m="10px"
            size="nm"
            ref={register({
              required: "Tell what the expense is!",
            })}
          />
          <Text m="10px">
            Value: {value}
            {value !== "" && " €"}
          </Text>
          <Input
            height="50px"
            value={value}
            onChange={handleChange}
            placeholder="Enter amount"
            type="number"
            name="amount"
            m="10px"
            size="sm"
            ref={register({
              required: "You have to enter an amount!",
            })}
          />

          {errors.what && <p>{errors.what.message}</p>}
          {errors.amount && <p>{errors.amount.message}</p>}
          <Button
            type="submit"
            m="10px"
            rightIcon={"➞"}
            colorScheme="teal"
            variant="outline"
          >
            Add expense
          </Button>
        </form>
        {resultOfPost !== "" && resultOfPost}
        <Divider p="20px" m="20px" />
      </Flex>
    </Layout>
  );
}
