module.exports = async (models) => {
    const {
        projects
    } = models;

    const findAllProject = async () => {
        return await projects.findAll();
    }

    return {
        findAllProject
    }
}