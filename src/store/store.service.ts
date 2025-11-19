async findByOwner(ownerId: number) {
  return this.repo.findOne({
    where: { owner: { id: ownerId } },
    relations: ['ratings', 'ratings.user']
  });
}
