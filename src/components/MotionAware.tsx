type MotionAwareProps = {
  motionSafe: React.ReactNode;
  motionReduce: React.ReactNode;
};

export const MotionAware = ({ motionSafe, motionReduce }: MotionAwareProps) => {
  return (
    <>
      <div className="force-motion-safe:inline force-motion-reduce:hidden hidden motion-safe:inline motion-reduce:hidden">
        {motionSafe}
      </div>

      <div className="force-motion-safe:hidden force-motion-reduce:inline inline motion-safe:hidden motion-reduce:inline">
        {motionReduce}
      </div>
    </>
  );
};
