import Chart from "react-google-charts";
import useUsers from "../../../hooks/useUsers";

// data for collumn chart
export const columnData = [
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "silver"], // English color name
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];

// data for piece chart
export const data = [
    ["Publishers", "Published Articles"],
    ["Falastin", 2],
    ["Al-Ayyam", 3],
    ["Al-Hayat al-Jadida", 5],
    ["Al-Hurriya", 2],
    ["Palestine TV", 7],
];

// options for pie chart
export const options = {
    title: "Publications stats",
};


const AdminDashboard = () => {
    // hooks and states
    const [allUsers, premiumUsers, regularUsers, isAllUsersLoading, isPremiumUsersLoading, isRegularUsersLoading] = useUsers();

    // if loading true
    if (isAllUsersLoading || isPremiumUsersLoading || isRegularUsersLoading) {
        return <div className="flex justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
            <progress className="progress w-56  h-2 lg:h-8 lg:w-80"></progress>
        </div>
    }

    return (
        <div>
            <h1 className="text-4xl text-gray-400 font-semibold text-center my-5">All Stats</h1>
            {/* user stats */}
            <div className="flex">
                <div className="w-full lg:w-3/4 mx-auto stats stats-vertical md:stats-horizontal">
                    {/* all users stats */}
                    <div className="stat bg-green-100">
                        <div className="stat-title">All Users</div>
                        <div className="stat-value">{allUsers.length}</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>
                    {/* premium users stats */}
                    <div className="stat bg-amber-100">
                        <div className="stat-title">Premium Users</div>
                        <div className="stat-value">{premiumUsers.length}</div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>
                    {/* regular users stats */}
                    <div className="stat bg-slate-100">
                        <div className="stat-title">Regular Users</div>
                        <div className="stat-value">{regularUsers.length}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                </div>
            </div>
            {/* pie chart for publications count */}
            <div className="pt-4 w-full lg:w-3/4 mx-auto">
                <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"400px"}
                />
            </div>
            <div className="flex flex-col md:flex-row justify-between mx-auto w-full lg:w-3/4 pt-4 gap-2 mb-5 md:mb-0">
                {/* column chart */}
                <div className="w-full">
                    <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="400px"
                        data={columnData} />
                </div>
                <div className="w-full">
                    <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="400px"
                        data={columnData} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;