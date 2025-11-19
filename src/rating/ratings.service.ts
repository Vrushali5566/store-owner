async listForOwnerStore(ownerId: number) {
  const store = await this.storesService.findByOwner(ownerId);
  if (!store) return [];

  return this.repo.find({
    where: { store: { id: store.id } },
    relations: ['user']
  });
}
