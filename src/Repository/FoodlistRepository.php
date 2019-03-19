<?php

namespace App\Repository;

use App\Entity\Foodlist;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Foodlist|null find($id, $lockMode = null, $lockVersion = null)
 * @method Foodlist|null findOneBy(array $criteria, array $orderBy = null)
 * @method Foodlist[]    findAll()
 * @method Foodlist[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FoodlistRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Foodlist::class);
    }

    // /**
    //  * @return Foodlist[] Returns an array of Foodlist objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Foodlist
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
