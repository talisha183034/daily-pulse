import CountUp from 'react-countup';
import useUsers from '../../../hooks/useUsers';

const Statistics = () => {
    // hooks and states
    const [allUsers, premiumUsers, regularUsers, isAllUsersLoading, isPremiumUsersLoading, isRegularUsersLoading] = useUsers();

    // if loading true
    // if (isAllUsersLoading || isPremiumUsersLoading || isRegularUsersLoading) {
    //     return <div className="flex bg-emerald-50 justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
    //         <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
    //     </div>
    // }

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-gray-400 sm:text-4xl">
                        Users stats
                    </h2>

                    <p className="mt-4 text-gray-500 sm:text-xl">
                        All users are shown below. <br />
                        And among them there are regular users as well as premium users count.
                    </p>
                </div>

                <div className="mt-8 sm:mt-12">
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {/* regular user counts */}
                        <div
                            className="flex flex-col bg-green-100 rounded-lg hover:shadow-md hover:duration-500 px-4 py-8 text-center"
                        >
                            <dt className="order-last text-lg font-medium text-gray-500">
                                All Users
                            </dt>

                            <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                                <CountUp
                                    start={1}
                                    end={allUsers.length}
                                    duration={5}
                                    delay={2}
                                />
                            </dd>
                        </div>

                        {/* premium user counts */}
                        <div
                            className="flex flex-col bg-amber-100 rounded-lg hover:shadow-md  hover:duration-500 px-4 py-8 text-center"
                        >
                            <dt className="order-last text-lg font-medium text-gray-500">
                                Premium Users
                            </dt>

                            <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                                <CountUp
                                    start={1}
                                    end={premiumUsers.length}
                                    delay={2}
                                    duration={5}
                                />
                            </dd>
                        </div>

                        {/* regular user counts */}
                        <div
                            className="flex flex-col rounded-lg bg-slate-100 hover:shadow-md hover:duration-500 px-4 py-8 text-center"
                        >
                            <dt className="order-last text-lg font-medium text-gray-500">
                                Regular Users
                            </dt>

                            <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                                <CountUp
                                    start={1}
                                    end={regularUsers.length}
                                    delay={2}
                                    duration={5}
                                />
                            </dd>
                        </div>


                    </dl>
                </div>
            </div>
        </section>
    );
};

export default Statistics;