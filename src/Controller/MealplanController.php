<?php

namespace App\Controller;

use App\Entity\Foodlist;
use App\Entity\DayProfile;
use App\Entity\Days;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class MealplanController extends Controller{

    /**
     * @Route("/Ajax", name="Tibia")
     * Method({"GET"})
     */
    public function ajaxAction(Request $request){

        if ($request->isXMLHttpRequest()) {         
            return new JsonResponse(array('data' => 'this is a json response'));
        }

        return new Response('This is not ajax!', 400);
    }

    /**
     * @Route("/AddtoDB", name="AddtoDB")
     * Method({"POST"})
     */

    public function AddtoDB(Request $request){


        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            if (!empty($content)) {
                // $params = json_decode($content, true);
                $food = new Foodlist();
                $food->setFoodName($_POST['FoodName']);
                $food->setProtein($_POST['Protein']);
                $food->setCalories($_POST['Calories']);
                $food->setCarbohydrate($_POST['Carbohydrates']);
                $food->setFat($_POST['Fat']);

    
                $em = $this->getDoctrine()->getManager();

                $em->persist($food);
                $em->flush();
            }
    
            return new Response($_POST['FoodName']);
        }
     
        return new Response('Error!', 400);
    }

    /**
     * @Route("/GetFoodList", name="GetFoodList")
     * Method({"GET"})
     */

     public function GetFoodList(Request $request){
       
        $Foodlist = $this->getDoctrine() 
      ->getRepository(Foodlist::class)
      ->findAll();  

         if ($request->isXmlHttpRequest()) {  
            $jsonData = array();  
            $idx = 0;  

            foreach($Foodlist as $food) {  
               $temp = array(
                  'FoodName' => $food->getFoodName(),  
                  'id' => $food->getId(),  
                  'Calories' => $food->getCalories(),
                  'Protein' => $food->getProtein(),
                  'Carbohydrates' => $food->getCarbohydrates(),
                  'Fat' => $food->getFat()
               );   
               $jsonData[$idx++] = $temp;  
            } 
            return new JsonResponse($jsonData); 
         
        }
     }

     /**
      * @Route("/SaveDayProfile", name="SaveDayProfile")
      * Method({"POST"})
      */

      public function SaveDayProfile(Request $request){

        $DayList = $this->getDoctrine() 
        ->getRepository(DayProfile::class)
        ->findAll(); 

        $maxValue = 0;

        foreach ($DayList as $key) {
            if($key->getDay()>$maxValue)
            $maxValue = $key->getDay();
        }

        $maxValue++;

        $day = new Days();
        $day->setName($_POST['name']);
        $day->setExtraID($maxValue);



        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            if (!empty($content)) {
                $params = json_decode($_POST['dayProfile']);
                $em = $this->getDoctrine()->getManager();
                
            foreach($params as $key) {
                $daySetting = new DayProfile();
                $daySetting->setMeal($key->Meal);
                $daySetting->setFoodId($key->id);
                $daySetting->setAmount($key->DayAmount);
                $daySetting->setDay($maxValue);

                $em->persist($daySetting);
                $em->flush();

                }
                $em->persist($day);
                $em->flush();
                
            }
    
            return new Response("Success");
        }
     
        return new Response('Error!', 400);

      }

      /**
       * @Route("/GetDayProfile", name="GetDayProfile")
       * Method({"GET})
       */

       public function GetDayProfile(Request $request){

        $DayList = $this->getDoctrine() 
        ->getRepository(DayProfile::class)
        ->findAll();

        $DayNames = $this->getDoctrine() 
        ->getRepository(Days::class)
        ->findAll();

        $Number = 0;
        $Days = array();
        foreach ($DayList as $key) {
            if(!in_array($key->getDay(), $Days))
            array_push($Days, $key->getDay());
        }

        if ($request->isXmlHttpRequest()) {  
            $jsonData = array();  
            $idx = 0;  

            foreach ($DayNames as $Day) {
                $DayArray = array();
                foreach($DayList as $Dayitem) {  

                    if($Day->getExtraID() == $Dayitem->getDay()){ 
                        $temp = array(
                            'Dayname' => $Day->getName(),
                            'DayProfile' => $Dayitem->getDay(),  
                            'foodId' => $Dayitem->getFoodId(),  
                            'Meal' => $Dayitem->getMeal(),
                            'Amount' => $Dayitem->getAmount()
                        );   
                    array_push($DayArray, $temp);

                    }
                } 
            $jsonData[$idx++] = $DayArray;  
            }
    
            return new JsonResponse(json_encode($jsonData)); 
         
        }
       }

    /**
     *@Route("/Mealplanner", name="Mealplanner")
     * 
     */

     public function Mealplanner(){
        $Mealplan = $this->getDoctrine()->getRepository
        (DayProfile::class)->findAll();

        $Days = $this->getDoctrine()->getRepository
        (Days::class)->findAll();

        return $this->render('Mealplanner/Mealplanner.html.twig', array
        ('meals' => $Mealplan));
     }
}