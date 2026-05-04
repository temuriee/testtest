import GroupCreate from "@/features/group/components/GroupCreate";
import GroupList from "@/features/group/components/GroupList";

const Group = () => {
  return (
    <div className="flex gap-10">
      <GroupCreate />
      <GroupList />
    </div>
  );
};

export default Group;
