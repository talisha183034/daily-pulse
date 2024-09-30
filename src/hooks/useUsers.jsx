import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {
    const axiosPublic = useAxiosPublic();
    // getting all users from database
    const { data: allUsers = [], isLoading : isAllUsersLoading } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await axiosPublic.get("/users")
            return res.data;
        }
    })
    // getting premium users from database
    const { data: premiumUsers = [], isPremiumUsersLoading } = useQuery({
        queryKey: ["premiumUsers"],
        queryFn: async () => {
            const res = await axiosPublic.get("/premiumUsers")
            return res.data;
        }
    })
    // getting regular users from database
    const { data: regularUsers = [], isRegularUsersLoading } = useQuery({
        queryKey: ["regularUsers"],
        queryFn: async () => {
            const res = await axiosPublic.get("/regularUsers")
            return res.data;
        }
    })
    return [allUsers, premiumUsers, regularUsers, isAllUsersLoading, isPremiumUsersLoading, isRegularUsersLoading]
};

export default useUsers;