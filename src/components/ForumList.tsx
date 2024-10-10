import { getCurrentUser } from '@aws-amplify/auth';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Textarea, Input, Skeleton, Avatar,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

type Forum = {
    name: string;
    description: string;
    created_by: string;
  };
export default function ForumList() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [forumData, setForumData] = useState({
    name: '',
    description: '',
    created_by: ''
  });
  const [isLoading, setIsLoading] = useState(false)
  const [forums, setForums] = useState<Forum[]>([]);
  const [currUser, setCurrUser] = useState('');
  const getAuthenticatedUser = async () => {
    try{
        const user = await getCurrentUser();
        setCurrUser(user?.username || '');
        setForumData({
            ...forumData,
            created_by: user?.username || ''
        })
    }catch(e){}
  }
  // Fetch forums from the API
  const fetchForums = async () => {
    try {
      setIsLoading(true)
      const result = await axios.get('https://6fd92qzz05.execute-api.us-west-1.amazonaws.com/getForums');
      setForums(result.data);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching forums:', error);
    }
  };

  // Call fetchForums when component mounts
  useEffect(() => {
    fetchForums();
    getAuthenticatedUser();
  }, []);
  
  const handleChange = (e:any) => {
    setForumData({
      ...forumData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axios.post('https://6fd92qzz05.execute-api.us-west-1.amazonaws.com/createForums', forumData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchForums(); 
    } catch (error) { }
  };

  return (
    <div className='p-20'>
      {isLoading ? (
        <>
          <Card className="w-[200px] space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">  
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </Card>
        </>
      ) : (
        <div>
          <div className='flex justify-end'><Button onPress={onOpen}>Create Forum</Button></div>
        <div className='flex flex-row flex-wrap gap-4 justify-center'>
         {forums.length > 0 && (
            forums.map((forum, index) => (
                <Card className="w-[400px]">
                  <CardHeader className="flex gap-3">
                  <Avatar showFallback src='https://images.unsplash.com/broken' />
                    <p className="text-md">{forum.created_by}</p>
                  </CardHeader>
                  <Divider/>
                  <CardBody>
                    <p className='font-bold'>{forum.name}</p>
                    <p>
                      {forum.description}
                    </p>
                  </CardBody>
                </Card>
              ))
            )
          }
      {/* <h2>Create Forum</h2>
      <form onSubmit={handleSubmit}>
        <div className="ul-global">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={forumData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={forumData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Forum</button>
      </form> */}
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Forum</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus 
                  label="Name"
                  labelPlacement="outside"
                  placeholder=" "
                  value={forumData.name}
                  onChange={handleChange}
                  variant="bordered"/>
                  <Textarea
                    label="Description"
                    variant="bordered"
                    labelPlacement="outside"
                    value={forumData.description}
                    onChange={handleChange}
                    placeholder=""
                    defaultValue=""
                  />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        </div>
      )}
      
    </div>
  );
}
