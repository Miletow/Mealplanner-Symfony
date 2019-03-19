<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\FoodlistRepository")
 */
class Foodlist
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     */
    private $foodName;

    /**
     * @ORM\Column(type="integer")
     */
    private $calories;

     /**
     * @ORM\Column(type="integer")
     */
    private $protein;

     /**
     * @ORM\Column(type="integer")
     */
    private $carbohydrate;

     /**
     * @ORM\Column(type="integer")
     */
    private $fat;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFoodName()
    {
        return $this->foodName;
    }

    public function setFoodName($name)
    {
        $this->foodName = $name;
    }

    public function getCalories()
    {
        return $this->calories;
    }

    public function setCalories($calories)
    {
        $this->calories = $calories;
    }

    public function getProtein()
    {
        return $this->protein;
    }

    public function setProtein($protein)
    {
        $this->protein = $protein;
    }

    public function getCarbohydrates()
    {
        return $this->carbohydrate;
    }

    public function setCarbohydrate($carbohydrate)
    {
        $this->carbohydrate = $carbohydrate;
    }

    public function setFat($fat)
    {
        $this->fat = $fat;
    }

    public function getFat()
    {
        return $this->fat;
    }
    
    
}
