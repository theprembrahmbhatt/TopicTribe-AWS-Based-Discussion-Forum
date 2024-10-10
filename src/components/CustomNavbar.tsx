import { fetchUserAttributes } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function CustomNavbar(props:any) {
    const { signOut } = props;
  const router = useRouter();
  const [currUser, setCurrUser] = useState('');
  const getAuthenticatedUser = async () => {
    try{
        const user = await fetchUserAttributes();
        setCurrUser(user?.preferred_username || 'default');
    }catch(e){}
  }
  useEffect(() => {
    getAuthenticatedUser();
  }, []);

  return (
    <>
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit text-3xl font-mono" >TopicTribe</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {currUser}
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" variant="flat" onClick={signOut}>
            Sign Out
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    </>
  );
}
