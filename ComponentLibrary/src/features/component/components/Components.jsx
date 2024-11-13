import ComponentCard from './ComponentCard';
import BasicBtn from '@/components/buttons/BasicBtn/BasicBtn';
import Loading from '@/components/Loading/Loading';

export const Components = ({
  components,
  isLoading,
  handleNewComponent,
  handleEdit,
}) => {
  return (
    <div className="w-full m-5 overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-scrollbar scrollbar-track-scrollbar-track bg-black rounded-2xl shadow-lg p-6 border border-gray-200 border-opacity-20">
      {isLoading ? (
        <Loading size="60px" color="#3498db" />
      ) : (
        <div className="max-h-80">
          <h1 className="text-3xl font-bold text-center text-white dark:text-white border-b mb-6">
            Components
          </h1>
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Manage your custom components or create a new one to get started.
            </p>
          </div>
          <div className="flex justify-center mt-6 mb-6">
            <BasicBtn
              onClick={handleNewComponent}
              label="Add New Component"
              className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-700"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.length > 0 ? (
              components.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  onEdit={() => handleEdit(component)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-neutral-400">
                No components available. Add one!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
