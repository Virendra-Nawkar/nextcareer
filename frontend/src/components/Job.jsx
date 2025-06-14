import React, { useState } from 'react';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(prev => !prev);
  };

  return (
    <div className="p-6 rounded-xl shadow-lg bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 select-none">
          {formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true })}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          type="button"
          onClick={toggleLike}
          aria-label={liked ? "Unlike" : "Like"}
          aria-pressed={liked}
          title={liked ? "Unlike" : "Like"}
        >
          <Heart
            size={24}
            stroke={liked ? '#ef4444' : 'currentColor'} // red heart for liked state only
            fill={liked ? '#ef4444' : 'none'}
            color={liked ? '#ef4444' : 'currentColor'}
            className="transition-colors duration-300"
          />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-4">
        <Button className="p-3 bg-transparent" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo || '/CompanyLogo.png'} />
          </Avatar>
        </Button>
        <div>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate max-w-xs sm:max-w-sm">
            {job?.company?.name || "No Name"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-extrabold text-xl my-2 text-gray-900 dark:text-gray-100 truncate">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-5">
        <Badge className="text-blue-700 font-bold dark:text-blue-400" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold dark:text-orange-400" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold dark:text-purple-400" variant="ghost">
          {job?.salary ? `${job.salary} LPA` : "Not Defined"}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1 sm:flex-initial"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] hover:bg-[#5a067d] text-white flex-1 sm:flex-initial transition-colors duration-300">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
