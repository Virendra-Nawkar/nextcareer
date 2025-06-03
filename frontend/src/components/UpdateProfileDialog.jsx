import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import store from '@/redux/store';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const {user} =  useSelector(store => store.auth);

  const [input, setinput] = useState([{
    fullname : user?.fullname,
    email : user?.email,
    phoneNumber : user?.phoneNumber,
    bio : user?.bio,
    skills : user?.profile?.skills?.map(skill => skill),
    file : user?.profile.resume
     
  }])
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name" name="name" value={input.name}
                  className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">Bio</Label>
                <Input
                  id="bio" name="bio" value={input.bio}
                  className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email" name="email" value={input.email}
                  className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">Phone No.</Label>
                <Input
                  id="phoneNumber" name="phoneNumber" value={input.phoneNumber}
                  className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skils" className="text-right">Skils</Label>
                <Input
                  id="skils" name="skils" value={input.skils}
                  className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">Resume</Label>
                <Input
                  id="file" name="file" type="file" accept="application/pdf" 
                  // value={input.file}
                  className="col-span-3" />
              </div>

            </div>
          </form>
          <DialogFooter>
            {
              loading ?
                <Button disabled={true} className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>
                : <Button type="submit" className="w-full my-4">Update</Button>
            }
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
