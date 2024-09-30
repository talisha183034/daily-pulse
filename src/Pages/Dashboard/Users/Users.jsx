import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import UserRow from "./UserRow";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Users = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: allUsers = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get("/users")
            return res.data;
        }
    })

    // handle pending, approve, cancel status
    const handleUpdate = (id, update, name) => {
        console.log(id, update);
        const role = update;
        axiosSecure.put(`/users/${id}`, { role })
            .then(res => {
                const data = res.data
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} is an admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })

    }

    // handle delete
    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        const data = res.data;
                        console.log(data);
                        let timerInterval;
                        Swal.fire({
                            title: "Deletion in process...!",
                            html: "User will be deleted in <b></b> milliseconds.",
                            timer: 1000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                                const timer = Swal.getPopup().querySelector("b");
                                timerInterval = setInterval(() => {
                                    timer.textContent = `${Swal.getTimerLeft()}`;
                                }, 100);
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            }
                        }).then((result) => {
                            /* Read more about handling dismissals below */
                            if (result.dismiss === Swal.DismissReason.timer) {
                                refetch();
                            }
                        });

                    })
            }
        });


    }
    // if loading true
    if (isLoading) {
        return <div className="flex justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
            <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
        </div>
    }

    return (
        <>
            <div>
                <h3 className="text-center pt-4 text-gray-400 text-4xl font-semibold">All Users</h3>
            </div>
            <div className="overflow-x-auto bg-green-50 pt-4 mb-5 md:mb-0">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="hidden lg:table-cell">#</th>
                            <th className="hidden md:table-cell">Name & image</th>
                            <th>User email</th>
                            <th className="hidden md:table-cell">Status</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            allUsers?.map((data, index) => <UserRow
                                key={data._id}
                                data={data}
                                index={index}
                                handleUpdate={handleUpdate}
                                handleDelete={handleDelete}
                            >
                            </UserRow>)
                        }
                    </tbody>

                </table>
            </div>
        </>
    );
};

export default Users;