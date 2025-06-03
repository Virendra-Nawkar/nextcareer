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

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '', // comma separated string
    file: null // cannot prefill a file input
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setInput(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Add your form submission logic here (e.g., API call)

    setTimeout(() => {
      setLoading(false);
      setOpen(false); // close dialog on success
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">Name</Label>
              <Input
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">Bio</Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">Phone No.</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">Resume</Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button disabled className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
